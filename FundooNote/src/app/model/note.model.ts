import { Label } from './label.model';

export class NoteModel {
    id: number;
    title: String;
    description: String;
    color: String;
    isArchive: boolean;
    isPin: boolean;
    isTrash: boolean;
    userID: number;
    imageUrl: String;
    // remainder: Date;
    remainder: any;
    labels: Label[];
}
