import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('MockInterview',{
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
})


export const UserAnswer = pgTable('UserAnswer',{
    id: serial('id').primaryKey(),
    mockIdRef:varchar('mockIdRef').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns').notNull(),
    userAnswer:text('userAnswer'),
    feedback:text('feedback').notNull(),
    rating:varchar('rating').notNull(),
    userEmail: varchar('userEmail').notNull(),
    createdAt: varchar('createdAt'),
})