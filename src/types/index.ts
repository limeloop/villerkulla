import { FormBuilderSchema } from '@/app/formBuilder/formInterpreter';

export * from './formBuilder';

export type Page = {
    id: number,
    websiteId: number,
    builderId: string,
    status: string
    title: string
    slug: string,
    data: FormBuilderSchema,
    html: string,  
    css: string,
    settings: string
    locale: string
}