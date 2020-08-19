/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import metricsManager from "./metrics-manager";
import logger from "./logger";

export const getAll = () => {
  logger.info("metrics.service getAll()");
  const metricsList = metricsManager.getMetrics();
  const response = metricsList
    .map(m => m.result)
    .filter(m => !!m)
    .join('\n');
  logger.silly("metrics result: %j", response);
  return response;
};
