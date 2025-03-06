import { workspaces, workspaceUsers, users, projectUsers, projects, websites, websitePages, websiteForms, submissions, submissionsMeta } from "@/backend/schema";

export namespace User {
  export type Select = typeof users.$inferSelect;
  export type Create = typeof users.$inferInsert;
}

export namespace Workspace {
  export type Select = typeof workspaces.$inferSelect;
  export type Create = typeof workspaces.$inferInsert;
}

export namespace WorkspaceUser {
  export type Select = typeof workspaceUsers.$inferSelect;
  export type Create = typeof workspaceUsers.$inferInsert;
  export type Item = User.Select & Select;
}

export namespace Project {
  export type Select = typeof projects.$inferSelect;
  export type Create = typeof projects.$inferInsert;
}

export namespace ProjectUser {
  export type Select = typeof projectUsers.$inferSelect;
  export type Create = typeof projectUsers.$inferInsert;
  export type Item = User.Select & Select;
}

export namespace ProjectWebsite {
  export type Select = typeof websites.$inferSelect;
  export type Create = typeof websites.$inferInsert;
  export type Item = Project.Select & Select;
}
export namespace ProjectWebsitePage {
  export type Select = typeof websitePages.$inferSelect;
  export type Create = typeof websitePages.$inferInsert;
  export type Item = ProjectWebsite.Select & Select;
}
export namespace ProjectWebsiteForms {
  export type Select = typeof websiteForms.$inferSelect;
  export type Create = typeof websiteForms.$inferInsert;
  export type Item = ProjectWebsite.Select & Select;
}

export namespace Submissions {
  export type Select = typeof submissions.$inferSelect;
  export type Create = typeof submissions.$inferInsert;
  export type Item = Submissions.Select & Select;
}
export namespace SubmissionsMeta {
  export type Select = typeof submissionsMeta.$inferSelect;
  export type Create = typeof submissionsMeta.$inferInsert;
  export type Item = SubmissionsMeta.Select & Select;
}
