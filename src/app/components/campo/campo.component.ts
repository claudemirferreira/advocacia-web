import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Campo } from '../../models/campo';
import { CampoService } from '../../services/campo.service';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-campo',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatInputModule],
  templateUrl: './campo.component.html',
  styleUrl: './campo.component.scss',
  providers: [HttpClientModule]
})
export class CampoComponent {
  displayedColumns: string[] = ['id', 'name'];
  campos!: Campo[];

  constructor(private campoService: CampoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.campoService.findAll()
      .subscribe(campos => this.campos = campos);
  }

}
