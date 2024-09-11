import { Component, ViewChild } from '@angular/core';
import { IonModal, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.page.html',
  styleUrls: ['./animacion.page.scss'],
})
export class AnimacionPage {
  @ViewChild('modal', { static: true }) modal!: IonModal;

   acceptedTerms: boolean = false;

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;

      if (!root) {
        console.error('Shadow root not found');
        return this.animationCtrl.create(); // Return an empty animation
      }

      const backdrop = root.querySelector('ion-backdrop');
      const wrapper = root.querySelector('.modal-wrapper');

      // Create animations only if the elements are found
      const backdropAnimation = backdrop 
        ? this.animationCtrl.create()
            .addElement(backdrop)
            .fromTo('opacity', '0.01', 'var(--backdrop-opacity)')
        : this.animationCtrl.create(); // Return an empty animation if backdrop is null

      const wrapperAnimation = wrapper 
        ? this.animationCtrl.create()
            .addElement(wrapper)
            .keyframes([
              { offset: 0, opacity: '0', transform: 'scale(0)' },
              { offset: 1, opacity: '1', transform: 'scale(1)' },
            ])
        : this.animationCtrl.create(); // Return an empty animation if wrapper is null

      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    this.modal.enterAnimation = enterAnimation;
    this.modal.leaveAnimation = leaveAnimation;
  }

  closeModal() {
    this.modal.dismiss();
  }

  onTermsChanged(event: any) {
    this.acceptedTerms = event.detail.checked;
  }
  acceptTerms() {
    if (this.acceptedTerms) {
      this.closeModal();
      // Aquí puedes añadir la lógica adicional después de que el usuario acepte los términos.
      console.log('Términos aceptados');
    }
  }
}
