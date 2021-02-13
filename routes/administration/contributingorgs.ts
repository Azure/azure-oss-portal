//
// Copyright (c) Microsoft.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//

import express from 'express';
import asyncHandler from 'express-async-handler';
import { ICorporateProviders } from '../../microsoft';
const router = express.Router();

import { ReposAppRequest } from '../../transitional';

router.get('/', asyncHandler(async function (req: ReposAppRequest, res, next) {
  const providers = req.app.settings.providers as ICorporateProviders;
  const individualContext = req.individualContext;
  const orgNames = await providers.eventRecordProvider.queryDistinctOrganizations();
  individualContext.webContext.render({
    view: 'administration/contributingorgs',
    title: `contributing orgs`,
    state: {
      names: orgNames,
      officialNames: new Set(providers.operations.organizationNames),
    },
  });
}));

module.exports = router;
