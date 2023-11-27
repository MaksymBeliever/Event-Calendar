import { object, string } from 'yup';

export const eventValidationSchema = object({
    title: string().trim().strict(true).required(),
    description: string().trim().strict(true).required(),
});
