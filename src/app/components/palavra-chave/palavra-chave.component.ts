import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../share/confirmation-dialog/confirmation-dialog.component';
import { PalavraChave } from '../../models/palavra-chave';
import { PalavraChaveService } from '../../services/palavra-chave.service';

@Component({
  selector: 'app-palavra-chave',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './palavra-chave.component.html',
  styleUrl: './palavra-chave.component.scss',
  providers: [HttpClientModule],
})
export class PalavraChaveComponent {
  displayedColumns: string[] = ['id', 'name', 'acoes'];
  palavrasChave!: PalavraChave[];

  constructor(private palavraChaveService: PalavraChaveService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.palavraChaveService.findAll().subscribe((palavrasChave) => (this.palavrasChave = palavrasChave));
  }

  findById(): void {
    this.palavraChaveService.findAll().subscribe((palavrasChave) => (this.palavrasChave = palavrasChave));
  }

  deleteById(id: number): void {
    this.palavraChaveService.deleteById(id).subscribe(
      (resposta) => {
        console.log('Dados salvos com sucesso!', resposta);
        this.findAll();
      },
      (error) => {
        console.error('Erro ao salvar os dados:', error);
      }
    );
  }

  openConfirmationDialog(palavrasChave: PalavraChave): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Tem certeza de que deseja excluir ' + palavrasChave.name + ' ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ação confirmada');
        this.deleteById(palavrasChave.id);
      } else {
        console.log('Ação cancelada');
      }
    });
  }
}
