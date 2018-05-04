import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDatepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetails } from './UserDetails';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr';

const now = new Date();

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  dataModel: UserDetails;
  userForm: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;
  constructor(
    config: NgbDatepickerConfig,
    private modalService: NgbModal,
    private userService: UserService,
    private toastr: ToastrService) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    config.outsideDays = 'hidden';
  }
  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      inputEmail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      mobileNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      birthday: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      profilePic: new FormControl('', Validators.required)
    });
  }

  open(content) {
    this.imageChangedEvent = null;
    this.modalService.open(content, {backdrop: 'static'});
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.userForm.controls['profilePic'].setValue(image);
    this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;
  }

  postDetails(post) {
    this.dataModel = post;
    this.dataModel.birthday = post.birthday.year + '-' + post.birthday.month + '-' + post.birthday.day;
    let errMessage: any = [];
    this.userService.registerUser(this.dataModel)
    .subscribe(
      (response: any) => {
        if (response.success === true) {
          this.toastr.success('Details saved successfully');
          this.userForm.reset();
          this.croppedImage = '';
        }else {
          this.toastr.error('Details not saved.');
        }
      },
      errorMsg => errMessage = <any>errorMsg
    );
    this.toastr.success('Details saved successfully');
    this.userForm.reset();
    this.croppedImage = '';
  }

  imageLoadFailed () {
    console.log('Load failed');
  }
}
