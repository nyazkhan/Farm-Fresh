import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../../../../services/stores/auth.store';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Address } from '../../../../models/address';
import { Purchase } from '../../../../models/purchase';
import { addAriaReferencedId } from '@angular/cdk/a11y/aria-describer/aria-reference';
import { CartStore } from '../../../../services/stores/cart-store';
import { PurchaseService } from '../../../../services/purchase.service';
import { PaymentDetails } from 'src/app/models/payment-details';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  wasTryToSubmitted = false;
  checkOutForm: FormGroup;
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  emailControl: FormControl;

  cityControl: FormControl;
  streetControl: FormControl;
  homeNumberControl: FormControl;
  apartmentControl: FormControl;
  ccname: FormControl;
  ccnumber: FormControl;
  ccexpiration: FormControl;
  cccvv: FormControl;
  user: User;
  cartItems$: Observable<CartItem[]>;

  constructor(private fb: FormBuilder, private auth: AuthStore, private router: Router, private purchaseService: PurchaseService, private cartStore: CartStore, private cartService: CartService) {
    this.user = auth.getUserDetails();
    this.initializeControls();
    this.attachControlsToForm();
    this.cartItems$ = this.cartStore.cartItems$;

  }

  ngOnInit(): void {
  }

  initializeControls(): void {
    this.firstNameControl = new FormControl(this.user.firstName, [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.lastNameControl = new FormControl(this.user.lastName, [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.emailControl = new FormControl(this.user.email, [
      Validators.required,
      Validators.email
    ]);
    this.cityControl = new FormControl('2222', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.streetControl = new FormControl('2222', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.homeNumberControl = new FormControl('222', [
      Validators.required,
    ]);
    this.apartmentControl = new FormControl('', [
      Validators.required,
    ]);
    this.ccname = new FormControl('name kahna', [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.ccnumber = new FormControl('33333333333333', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(16),
      Validators.pattern(/^[0-9]*$/)
    ]);
    this.ccexpiration = new FormControl('02/30', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
    ]);
    this.cccvv = new FormControl('234', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern(/^[0-9]*$/)


    ]);

  }


  private attachControlsToForm() {
    this.checkOutForm = this.fb.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      city: this.cityControl,
      street: this.streetControl,
      homeNumber: this.homeNumberControl,
      apartment: this.apartmentControl,
      ccname: this.ccname,
      ccnumber: this.ccnumber,
      ccexpiration: this.ccexpiration,
      cccvv: this.cccvv
    });
  }

  getValidationClasses(controlName: string) {
    if (this.checkOutForm.controls[controlName].valid) {
      return 'is-valid';
    }
    else {
      if (this.wasTryToSubmitted) {
        return 'is-invalid';
      }
    }
  }

  submit() {
    this.wasTryToSubmitted = true;
    if (this.checkOutForm.valid) {
      const user: User = new User(this.firstNameControl.value, this.lastNameControl.value, this.emailControl.value);
      const address = new Address(this.cityControl.value, this.streetControl.value, this.homeNumberControl.value, this.apartmentControl.value);
      const paymentDetails = new PaymentDetails(this.ccname.value, this.ccnumber.value, this.ccexpiration.value, this.cccvv.value);
      this.purchaseService.postPurchase(user, address, paymentDetails)
        .subscribe(
          (val) => {


if (val && val.items && val.items.length>0) {

  val.items.forEach(element => {
    
    this.cartStore.deleteItemFromCart(element).subscribe(() => console.log('item deleted'));
  });

  localStorage.removeItem('checkout');
}
this.router.navigateByUrl('/checkout/thanks');

          },
          err => {
            console.log(err);
          }
        );
    }
  }
}



