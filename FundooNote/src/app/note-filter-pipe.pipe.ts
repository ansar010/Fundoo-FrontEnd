import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteFilterPipe'
})
export class NoteFilterPipePipe implements PipeTransform {

  transform(notes: any[], searchTerm: string): any[] {
    return notes.filter(note => note.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
  }

}
