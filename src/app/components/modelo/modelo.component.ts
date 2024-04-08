import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Modelo } from '../../models/modelo';
import { ModeloService } from '../../services/modelo.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../share/confirmation-dialog/confirmation-dialog.component';
import { CampoModeloComponent } from './campo-modelo/campo-modelo.component';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-modelo',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './modelo.component.html',
  styleUrl: './modelo.component.scss',
})
export class ModeloComponent {
  title = 'Angular Material 17 File Upload';

  displayedColumns: string[] = ['id', 'name', 'acoes'];
  modelos!: Modelo[];

  constructor(private modeloService: ModeloService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.modeloService
      .findAll()
      .subscribe((modelos) => (this.modelos = modelos));
  }

  download(id: number) {
    const fileName = 'nome_do_arquivo.docx';
    this.modeloService.download(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  findById(): void {
    this.modeloService.findAll().subscribe((modelos) => (this.modelos = modelos));
  }

  deleteById(id: number): void {
    this.modeloService.deleteById(id).subscribe(
      (resposta) => {
        console.log('Dados salvos com sucesso!', resposta);
        this.findAll();
      },
      (error) => {
        console.error('Erro ao salvar os dados:', error);
      }
    );
  }

  openConfirmationDialog(modelo: Modelo): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Tem certeza de que deseja excluir ' + modelo.name + ' ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ação confirmada');
        this.deleteById(modelo.id);
      } else {
        console.log('Ação cancelada');
      }
    });
  }

  openModalCampo(modelo: Modelo): void {
    const dialogRef = this.dialog.open(CampoModeloComponent, {
      data: modelo,
      width: '800px', // Define a largura do modal
      height: '600px' // Define a altura do modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
    });
  }

  openModalUpload(modelo: Modelo): void {
    const dialogRef = this.dialog.open(UploadComponent, {
      data: modelo,
      width: '800px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
    });
  }
  
}
