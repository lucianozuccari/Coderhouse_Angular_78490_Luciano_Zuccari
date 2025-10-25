import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'delete-confirm-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './delete-confirm-modal.component.html',
  styleUrl: './delete-confirm-modal.component.scss'
})
export class DeleteConfirmModalComponent {
  @Input() isVisible = false;
  @Input() isDeleting = false;

  
  @Input() confirmMessage: string | null = null;

  
  @Input() extraInfoTemplate?: TemplateRef<any>;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmDeleteEvent = new EventEmitter<void>();

  closeModal(): void {
    if (!this.isDeleting) {
      this.closeModalEvent.emit();
    }
  }

  confirmDelete(): void {
    if (!this.isDeleting) {
      this.confirmDeleteEvent.emit();
    }
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
