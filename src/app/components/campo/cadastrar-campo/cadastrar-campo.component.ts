import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CampoService } from '../../../services/campo.service';
import { Campo } from '../../../models/campo';

@Component({
  selector: 'app-cadastrar-campo',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,

  ],
  templateUrl: './cadastrar-campo.component.html',
  styleUrl: './cadastrar-campo.component.scss'
})
export class CadastrarCampoComponent implements OnInit {
  cadastroForm!: FormGroup;
  campo: Campo = {
    name: '',
    id: 0
  };

  id: number | undefined;

  constructor(private fb: FormBuilder,
              private campoService: CampoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      name: ['', Validators.required]
    });
    const id = this.route.snapshot.paramMap.get('id');
    if(id != undefined){
      this.findById(id);
    }
  }

  submitForm() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
      this.save();
    } else {
      this.markFormGroupTouched(this.cadastroForm);
    }
  }

  save(): void {
    this.campoService.save(this.campo).subscribe(
      resposta => {
        // Manipule a resposta da API, se necessário
        console.log('Dados salvos com sucesso!', resposta);
        this.router.navigate(['/campo'])
      },
      error => {
        console.error('Erro ao salvar os dados:', error);
      }
    );
  }

  findById(id: string): void {
    this.campoService.findById(id).subscribe(
      resposta => {
        this.campo = resposta;
        console.log('Dados salvos com sucesso!', resposta);
      },
      error => {
        console.error('Erro ao salvar os dados:', error);
      }
    );
  }

  // Função para marcar todos os campos como tocados
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
