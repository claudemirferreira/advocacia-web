import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PalavraChaveService } from '../../../services/palavra-chave.service';
import { PalavraChave } from '../../../models/palavra-chave';

@Component({
  selector: 'app-cadastrar-palavra-chave',
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
  templateUrl: './cadastrar-palavra-chave.component.html',
  styleUrl: './cadastrar-palavra-chave.component.scss'
})
export class CadastrarPalavraChaveComponent implements OnInit {
  cadastroForm!: FormGroup;
  palavraChave: PalavraChave = {
    name: '',
    id: 0
  };

  id: number | undefined;

  constructor(private fb: FormBuilder,
              private palavraChaveService: PalavraChaveService,
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
    this.palavraChaveService.save(this.palavraChave).subscribe(
      resposta => {
        // Manipule a resposta da API, se necessário
        console.log('Dados salvos com sucesso!', resposta);
        this.router.navigate(['/palavra-chave'])
      },
      error => {
        console.error('Erro ao salvar os dados:', error);
      }
    );
  }

  findById(id: string): void {
    this.palavraChaveService.findById(id).subscribe(
      resposta => {
        this.palavraChave = resposta;
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
