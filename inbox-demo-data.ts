import * as moment from 'moment';
import { Color } from './inbox/shared/color.interface';
import { Notification } from './inbox/shared/notification.interface';

export const labelColors: Color[] = [
  {
    name: 'Indigo',
    code: '#3F51B5'
  },
  {
    name: 'Teal',
    code: '#009688'
  },
  {
    name: 'Light Blue',
    code: '#03A9F4'
  },
  {
    name: 'Deep Purple',
    code: '#673AB7',
  },
  {
    name: 'Purple',
    code: '#9C27B0'
  },
  {
    name: 'Green',
    code: '#4CAF50'
  },
  {
    name: 'Deep Orange',
    code: '#FF5722'
  },
  {
    name: 'Red',
    code: '#f44336'
  },
  {
    name: 'Yellow',
    code: '#FFEB3B'
  }
];

export const inboxNotifications: Notification[] = <Notification[]>[
  {
    'id': '5aaa797b216d4dae2587b111',
    'name': 'Объявление на торги',
    'content': 'Ваша заявка на регистрацию № 2131 была принята в работу',
    'when': '13:23',
    'read': true,
    'starred': false,
    'group': 'primary'
  },
  {
    'id': '5aaa797b216d4dae2587b112',
    'name': 'Объявление на торги',
    'content': 'Ваша заявка на регистрацию № 2131 была принята в работу',
    'when': '17:43',
    'read': false,
    'starred': false,
    'group': 'primary'
  },
  {
    'id': '5aaa797b216d4dae2587b113',
    'name': 'Заявка на регистрацию',
    'content': 'Ваша заявка на регистрацию № 2131 была подтверждена',
    'when': 'вчера',
    'read': false,
    'starred': false,
    'group': 'primary'
  },
  {
    'id': '5aaa797b216d4dae2587b114',
    'name': 'Заявка на регистрацию',
    'content': 'Ваша заявка на регистрацию № 2131 была подтверждена',
    'when': '6 августа',
    'read': false,
    'starred': false,
    'group': 'primary'
  }
];
