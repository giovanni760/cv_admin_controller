import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {

  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  certificates: Certificates[] = [];
  myCertificates: Certificates = new Certificates();
  selectedId: string | null = null;

  constructor(public certificatesService: CertificatesService) {
    console.log(this.certificatesService);
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
      
    ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
    });
  }
AgregarJob() {
    if (this.selectedId) {
      this.certificatesService.updateCertificates(this.selectedId, this.myCertificates)
        .then(() => {
          console.log('Item actualizado correctamente');
          this.resetForm();
        });
    } else {
      this.certificatesService.createCertificates(this.myCertificates).then(() => {
        console.log('Item creado correctamente');
        this.resetForm();
      });
    }
  }

  editJob(job: any) {
    this.selectedId = job.id;
    this.myCertificates = { ...job }; // Llenamos el formulario
//   this.btnTxt = "Actualizar";
  }

  deleteJob(id?: string) {
    this.certificatesService.deleteCertificates(id).then(() => {
      console.log('Item eliminado correctamente');
      if (id === this.selectedId) {
        this.resetForm();
      }
    });
  }
      resetForm() {
    this.myCertificates = new Certificates();
    this.selectedId = null;
    this.btnTxt = "Agregar";
  }

}
/*
AgregarJob(){
 console.log(this.myCertificates);
 this.certificatesService.createCertificates(this.myCertificates).then(() => {
 console.log('Created new item successfully!');
 });
}

deleteJob(id? :string){
        this.certificatesService.deleteCertificates(id).then(() => {
        console.log('delete item successfully!');
        });
        console.log(id);
}
  updateJob(id?: string) {
    this.certificatesService.updateCertificates(this.myCertificates, id).then(() => {
      console.log('update item successfully');
    });
    console.log(id);
  }
}
*/
