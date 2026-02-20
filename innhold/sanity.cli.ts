import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wpjddqhy',
    dataset: process.env.SANITY_STUDIO_DATASET || 'innhold',
  },
  deployment: {
    appId: 'p4376wyafx193uq1r1baprua',
    autoUpdates: true,
  },
})
