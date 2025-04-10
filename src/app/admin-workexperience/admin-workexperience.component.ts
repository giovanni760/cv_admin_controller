import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();
  selectedId: string | null = null;


  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }

 AgregarJob() {
    if (this.selectedId) {
      this.workExperienceService.updateWorkExperience(this.selectedId, this.myWorkExperience)
        .then(() => {
          console.log('Item actualizado correctamente');
          this.resetForm();
        });
    } else {
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Item creado correctamente');
        this.resetForm();
      });
    }
  }

  editJob(job: any) {
    this.selectedId = job.id;
    this.myWorkExperience = { ...job }; // Llenamos el formulario
 //   this.btnTxt = "Actualizar";
  }

  deleteJob(id?: string) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmacion && id) {
      this.workExperienceService.deleteWorkExperience(id);
      if (this.selectedId === id) this.resetForm();
    }
  }
  

  resetForm() {
    this.myWorkExperience = new WorkExperience();
    this.selectedId = null;
    this.btnTxt = "Agregar";
  }
}


/*
AgregarJob(){
 console.log(this.myWorkExperience);
 this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
 console.log('Created new item successfully!');
 }); 
}

deleteJob(id? :string){
	this.workExperienceService.deleteWorkExperience(id).then(() => {
	console.log('delete item successfully!');
	});
	console.log(id);
}
*/

