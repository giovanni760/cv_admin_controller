import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  languages: Languages[] = [];
  myLanguages: Languages = new Languages();
  selectedId: string | null = null;

  constructor(public languagesService: LanguagesService) {
    console.log(this.languagesService);
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
      
    ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
    });
  }
  AgregarJob() {
    if (this.selectedId) {
      this.languagesService.updateLanguages(this.selectedId, this.myLanguages)
        .then(() => {
          console.log('Item actualizado correctamente');
         this.resetForm();
        });
    } else {
      this.languagesService.createLanguages(this.myLanguages).then(() => {
        console.log('Item creado correctamente');
        this.resetForm();
      });
    }
  }

  editJob(job: any) {
    this.selectedId = job.id;
    this.myLanguages = { ...job }; // Llenamos el formulario
 //   this.btnTxt = "Actualizar";
  }

  deleteJob(id?: string) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmacion && id) {
      this.languagesService.deleteLanguages(id);
      if (this.selectedId === id) this.resetForm();
    }
  }

 /* deleteJob(id?: string) {
    this.languagesService.deleteLanguages(id).then(() => {
      console.log('Item eliminado correctamente');
      if (id === this.selectedId) {
        this.resetForm();
      }
    });
  }*/
    resetForm() {
    this.myLanguages = new Languages();
    this.selectedId = null;
    this.btnTxt = "Agregar";
  }

}
/*
AgregarJob(){
 console.log(this.myLanguages);
 this.languagesService.createLanguages(this.myLanguages).then(() => {
 console.log('Created new item successfully!');
 });
}

deleteJob(id? :string){
        this.languagesService.deleteLanguages(id).then(() => {
        console.log('delete item successfully!');
        });
        console.log(id);
}
updateJob(id?: string) {
    this.languagesService.updateLanguages(this.myLanguages, id).then(() => {
      console.log('update item successfully');
    });
    console.log(id);
  }
*/


