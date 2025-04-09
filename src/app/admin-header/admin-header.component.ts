import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  header: Header[] = [];
  myHeader: Header = new Header();
     selectedId: string | null =null;


  constructor(public headerService: HeaderService) {
    console.log(this.headerService);
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
      
    ).subscribe(data => {
      this.header = data;
      console.log(this.header);
    });
  }
AgregarJob() {
    if (this.selectedId) {
      this.headerService.updateHeader(this.selectedId, this.myHeader)
        .then(() => {
          console.log('Item actualizado correctamente');
         this.resetForm();
        });
    } else {
      this.headerService.createHeader(this.myHeader).then(() => {
        console.log('Item creado correctamente');
       this.resetForm();
      });
    }
  }

  editJob(job: any) {
    this.selectedId = job.id;
    this.myHeader = { ...job };  
 //   this.btnTxt = "Actualizar";
  }

  deleteJob(id?: string) {
    this.headerService.deleteHeader(id).then(() => {
      console.log('Item eliminado correctamente');
      if (id === this.selectedId) {
//        this.resetForm();
      }
    });
}

  resetForm() {
    this.myHeader = new Header();
    this.selectedId = null;
    this.btnTxt = "Agregar";
  }
}
/*
AgregarJob(){
 console.log(this.myHeader);
 this.headerService.createHeader(this.myHeader).then(() => {
 console.log('Created new item successfully!');
 });
}

deleteJob(id? :string){
        this.headerService.deleteHeader(id).then(() => {
        console.log('delete item successfully!');
        });
        console.log(id);
}*/

