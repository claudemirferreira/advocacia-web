import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modelo } from '../../../models/modelo';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { ModeloService } from '../../../services/modelo.service';
import { CampoValor } from '../../../models/campo-valor';
import { ModeloDocumento } from '../../../models/modelo-documento';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-campo-modelo',
  standalone: true,
  imports: [
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './campo-modelo.component.html',
  styleUrl: './campo-modelo.component.scss'
})
export class CampoModeloComponent {
  displayedColumns: string[] = ['nome', 'valor'];


  camposValor!: CampoValor[];
  modeloDocumento!: ModeloDocumento;


  @Input() modelo!: Modelo;

  constructor(private modeloService: ModeloService,
    @Inject(MAT_DIALOG_DATA) public data: Modelo,) {
    this.modelo = data;
    console.log(this.modelo)
  }

  ngOnInit(): void {
    this.findAllCampoValor();
  }

  findAllCampoValor(): void {
    this.modeloService.findAllCampoValor()
      .subscribe((camposValor) => (this.camposValor = camposValor));
  }

  editRow(row: any): void {
    row.editavel = true;
  }

  saveRow(row: any): void {
    row.editavel = false;
    // Aqui você pode adicionar a lógica para salvar as alterações
  }

  cancelEdit(row: any): void {
    row.editavel = false;
    // Aqui você pode adicionar a lógica para cancelar as alterações
  }

  gerarDocumento(){
    this.modeloDocumento = {
      id: this.modelo.id,
      camposValor: this.camposValor
    }

    const fileName = 'nome_do_arquivo.docx';

    this.modeloService.gerarDocumento(this.modeloDocumento).subscribe((blob) => {
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

    console.log(JSON.stringify(this.camposValor))
  }

}
