import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';


import { RegexEnum } from 'src/app/pages/global/regex-enum';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from '../../shared/services/auth/auth.service';
import { FormService } from '../../shared/services/form.service';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
  selector: 'app-reset-email-password',
  templateUrl: './reset-email-password.component.html',
  styleUrls: ['./reset-email-password.component.scss']
})
export class ResetEmailPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  private response: Subject<any>;
  public messageList: any = {};
  private uniqueCode;
  public showPasswordForm;
  constructor(
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private formService: FormService,
    public translation: TranslateService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  async ngOnInit() {
    this.uniqueCode = this.route.snapshot.paramMap.get('uniqueCode');
    this.response = new Subject();
    await this.checkResetLinkExpired();
    this.initializeResetPasswordForm();
    this.initializeMessages();
  }

  onHide() {
    this.modalRef.hide();
  }

  initializeResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      otp: ['', [
        Validators.required]
      ],
      password: ['', [
        Validators.required,
        Validators.pattern(RegexEnum.passwordValidation)]
      ],
      confirmpassword: ['', [
        Validators.required]
      ],
    },
      { validator: UtilityService.MatchPassword }
    );
  }

  initializeMessages() {
    this.messageList.otp = {
      pattern: this.translation.instant('ERR_PASSWORD_INVALID'),
      required: this.translation.instant('ERR_MSG_PASSWORD_REQUIRED'),
    };
    this.messageList.password = {
      pattern: this.translation.instant('ERR_PASSWORD_INVALID'),
      required: this.translation.instant('ERR_MSG_PASSWORD_REQUIRED'),
    };
    this.messageList.confirmpassword = {
      required: this.translation.instant('ERR_PASSWORD_REQUIRED'),
    };
  }

  get resetPasswordFormControls() { return this.resetPasswordForm.controls; }

  async onResetPassword() {
    this.formService.markFormGroupTouched(this.resetPasswordForm);
    if (this.resetPasswordForm.valid) {
      this.ngxLoader.start();
      const obj = {
        uniqueCode: this.uniqueCode,
        password: this.resetPasswordForm.get('password').value,
      };
      await this.authService.resetPassword(obj);
    }
  }

  async checkResetLinkExpired() {
    if (this.uniqueCode) {
      this.ngxLoader.start();
      const response: any = await this.authService.verifyPasswordLink(this.uniqueCode);
      if (response && response.message) {
        this.showPasswordForm = true;
      }
    }
  }
}
