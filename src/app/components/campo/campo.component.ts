import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Campo } from '../../models/campo';
import { CampoService } from '../../services/campo.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../share/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-campo',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './campo.component.html',
  styleUrl: './campo.component.scss',
  providers: [HttpClientModule],
})
export class CampoComponent {
  displayedColumns: string[] = ['id', 'name', 'acoes'];
  campos!: Campo[];

  constructor(private campoService: CampoService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.campoService.findAll().subscribe((campos) => (this.campos = campos));
  }

  findById(): void {
    this.campoService.findAll().subscribe((campos) => (this.campos = campos));
  }

  deleteById(id: number): void {
    this.campoService.deleteById(id).subscribe(
      (resposta) => {
        console.log('Dados salvos com sucesso!', resposta);
        this.findAll();
      },
      (error) => {
        console.error('Erro ao salvar os dados:', error);
      }
    );
  }

  openConfirmationDialog(campo: Campo): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Tem certeza de que deseja excluir ' + campo.name + ' ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ação confirmada');
        this.deleteById(campo.id);
      } else {
        console.log('Ação cancelada');
      }
    });
  }
}
