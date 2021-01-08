import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    //class - the array of all clases
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen() {
       this.isOpen = !this.isOpen;
    }
}