import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email-link',
  templateUrl: './verify-email-link.component.html',
  styleUrls: ['./verify-email-link.component.scss']
})
export class VerifyEmailLinkComponent implements OnInit {
  private uniqueCode;
  public emailVerificationMessage = '';
  constructor(
    public translation: TranslateService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.uniqueCode = this.route.snapshot.paramMap.get('uniqueCode');
    await this.veriFyEmail();
  }

  async veriFyEmail() {
    if (this.uniqueCode) {
      const response: any = await this.authService.verifyEmail(this.uniqueCode);
      if (response && response.message) {
        this.emailVerificationMessage = response.message;
      }
      if (response && response.error) {
        this.emailVerificationMessage = response.error;
      }
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}

