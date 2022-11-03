import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientRequest } from "http";

import { Funcionario } from 'src/app/models/funcionario';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {
  funcionarios!: Funcionario[];
  
  constructor(private http : HttpClient) { }

  ngOnInit(): void {

    //Configurando a requisição para a API    
    this.http.get<Funcionario[]>("https://localhost:7277/api/Employee/list")
    //Executar a requisição
    .subscribe({
      next : (funcionarios) => {
        this.funcionarios = funcionarios;
      }
    });
  }
}
