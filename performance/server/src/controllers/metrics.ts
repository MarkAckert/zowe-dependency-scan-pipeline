/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import * as metricsService from "../services/metrics";
import { Request, Response } from "express";

export const getAll = (req: Request, res: Response) => {
  const data = metricsService.getAll()
  res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  res.end(data);
};
