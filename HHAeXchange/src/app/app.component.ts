import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HhaService } from './hha.service';
import { PublicHealthMeasures } from './_models/datas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HHAeXchange';
  public publicHealthMeasures: PublicHealthMeasures[];
  state;
  subscription$: Subscription;
  myForm: FormGroup;
  constructor(private myService: HhaService, private fb: FormBuilder) {
    this.myForm = fb.group({
      state: ['', Validators.required],
    });
  }

  onStateSelected() {
    this.myService.filterDataByState(this.myForm.value.state);
  }
  ngOnInit() {
    this.subscription$ = this.myService.getData().subscribe((data) => {
      this.publicHealthMeasures = data;
    });
  }
}
