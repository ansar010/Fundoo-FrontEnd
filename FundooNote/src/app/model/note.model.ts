import { Label } from './label.model';

export class NoteModel {
    id: number;
    title: String;
    description: String;
    color: String;
    remainder: String;
    isArchive: boolean;
    isPin: boolean;
    isTrash: boolean;
    userID: number;
    image: String;
    labels: Label[];
}
