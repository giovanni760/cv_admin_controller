import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  education: Education[] = [];
  myEducation: Education = new Education();
  selectedId: string | null = null;


  constructor(public educationService: EducationService) {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
      
    ).subscribe(data => {
      this.education = data;
      console.log(this.education);
    });
  }
  AgregarJob() {
    if (this.selectedId) {
      this.educationService.updateEducation(this.selectedId, this.myEducation)
        .then(() => {
          console.log('Item actualizado correctamente');
          this.resetForm();
        });
    } else {
      this.educationService.createEducation(this.myEducation).then(() => {
        console.log('Item creado correctamente');
        this.resetForm();
      });
    }
  }

  editJob(job: any) {
    this.selectedId = job.id;
    this.myEducation = { ...job }; // Llenamos el formulario
//    this.btnTxt = "Actualizar";
  }
  deleteJob(id?: string) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmacion && id) {
      this.educationService.deleteEducation(id);
      if (this.selectedId === id) this.resetForm();
    }
  }
/*
  deleteJob(id?: string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('Item eliminado correctamente');
      if (id === this.selectedId) {
        this.resetForm();
      }
    });
  }*/
      resetForm() {
    this.myEducation = new Education();
    this.selectedId = null;
    this.btnTxt = "Agregar";
  }

}
/*
AgregarJob(){
 console.log(this.myEducation);
 this.educationService.createEducation(this.myEducation).then(() => {
 console.log('Created new item successfully!');
 });
}

deleteJob(id? :string){
        this.educationService.deleteEducation(id).then(() => {
        console.log('delete item successfully!');
        });
        console.log(id);
}
updateJob(id?: string) {
    this.educationService.updateEducation(this.myEducation, id).then(() => {
      console.log('update item successfully');
    });
    console.log(id);
  }
*/


