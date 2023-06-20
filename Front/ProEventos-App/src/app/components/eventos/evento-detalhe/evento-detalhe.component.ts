import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Eventos } from 'src/app/models/Eventos';
import { EventoService } from 'src/app/services/evento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.css'],
})
export class EventoDetalheComponent implements OnInit {
  evento = {} as Eventos;
  form: FormGroup;
  modoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  public bsConfig(): any {
    return {
      adaptivePosition: true,
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam != null) {
      this.spinner.show();

      this.modoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Eventos) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if(this.form.valid) {

      this.evento = {...this.form.value};

      if(this.modoSalvar == 'post') {
        this.evento = {...this.form.value};
        this.eventoService[this.modoSalvar](this.evento).subscribe(
          () => this.toastr.success('Evento salvo com sucesso.', 'Sucesso!'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar evento', 'Erro!');
          },
          () => this.spinner.hide(),
        );
      } else {
        debugger
        const eventoIdParam = this.router.snapshot.paramMap.get('id');
        this.evento = {id: eventoIdParam,...this.form.value};
        this.eventoService['put'](this.evento).subscribe(
          () => this.toastr.success('Evento salvo com sucesso.', 'Sucesso!'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar evento', 'Erro!');
          },
          () => this.spinner.hide(),
        );
      }
    }
  }
}
