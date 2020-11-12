/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import got from "got";
import WrkTestCase from "../../../testcase/wrk";
import { getBasicAuthorizationHeader, getBasicAuthorizationHeaderValue } from "../../../utils";
import PerformanceTestException from "../../../exceptions/performance-test-exception";

class ExplorerApiJobOutputFileContentTest extends WrkTestCase {
  fetchZoweVersions = true;

  name = "Test explorer data sets api endpoint /api/v2/jobs/{jobName}/{jobId}/files/{fileId}/content";
  endpoint = '/api/v2/jobs/SDSF/{jobId}/files/{fileId}/content';

  duration = 5;
  concurrency = 10;
  threads = 1;

  async before(): Promise<void> {
    await super.before();

    // get active job ID
    const jobUrl = `https://${this.targetHost}:${this.targetPort}/api/v2/jobs?prefix=SDSF&status=ACTIVE&owner=*`;
    const { body } =  await got(jobUrl, {
      https: {
        rejectUnauthorized: false
      },
      headers: {
        "Authorization": getBasicAuthorizationHeaderValue()
      },
      responseType: 'json'
    }); 
    const jobs = body as {items: [{[key: string]: string|null}]};
    const jobId = jobs && jobs.items[0] && jobs.items[0]['jobId'];
    if (!jobId) {
      throw new PerformanceTestException("Cannot find job ID for testing");
    }

    // apply the changes to endpoint and test url
    this.endpoint = this.endpoint.replace('{jobId}', jobId);
    this.endpoint = this.endpoint.replace('{fileId}', '3');
    this.fullUrl = `https://${this.targetHost}:${this.targetPort}${this.endpoint}`;

    this.headers.push(getBasicAuthorizationHeader());
  }
}

new ExplorerApiJobOutputFileContentTest().init();
