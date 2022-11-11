import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Folha } from 'src/app/models/folha';
import { Funcionario } from 'src/app/models/funcionario';

@Component({
  selector: 'app-cadastrar-folha',
  templateUrl: './cadastrar-folha.component.html',
  styleUrls: ['./cadastrar-folha.component.css']
})
export class CadastrarFolhaComponent implements OnInit {

  valorHora!: number;
  quantidadeHoras!: number;
  data!: string;
  errormessage!: string;
  funcionarios!: Funcionario[];
  funcionarioId!:number;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {


   }

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

    // CADASTRAR ----------------------- 
    cadastrar(): void {
      let dataConvertida = new Date(this.data);
      
      let folha : Folha = {
        valorHora : this.valorHora,
        quantidadeHoras : this.quantidadeHoras,
        CreatedAt : dataConvertida,
        employeeId : this.funcionarioId
      };

      
      //Cadastrar
      this.http.post<Folha>("https://localhost:7277/api/Folha/registrar", folha)
      //Executar a requisição
      .subscribe({
        //Caso a requisição for bem sucedida cai no next
        next: (funcionario) => {
          this.router.navigate(["pages/funcionario/listar"]);
        },
        //Caso dê erro
      });
  
    }  

}
