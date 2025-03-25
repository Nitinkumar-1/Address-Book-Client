import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressBookService, Person } from '../services/address-book.service';
import { AddPersonComponent } from '../add-person/add-person.component';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'address', 'city', 'state', 'zipcode', 'phoneNumber', 'actions'];
  dataSource: Person[] = [];

  constructor(private addressBookService: AddressBookService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchPersons();
  }

  fetchPersons(): void {
    this.addressBookService.getAllPersons().subscribe((data) => {
      this.dataSource = data;
    });
  }

  openAddPersonDialog(): void {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPerson(result);
      }
    });
  }

  addPerson(newPerson: Person): void {
    this.addressBookService.addPerson(newPerson).subscribe(() => {
      this.fetchPersons();
    });
  }

  editPerson(person: Person): void {
    this.addressBookService.updatePerson(person.id!, person).subscribe(() => {
      this.fetchPersons();
    });
  }

  deletePerson(person: Person): void {
    this.addressBookService.deletePerson(person.id!).subscribe(() => {
      this.fetchPersons();
    });
  }
}
