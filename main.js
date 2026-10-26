'use strict';

// EDYCJA PROGRAMU: jedna pozycja = jeden obiekt; przy pustym tytule wyświetli się placeholder.
const schedule = [
  {day:'2026-11-05',time:'13:30',event:'Otwarcie konferencji'},
  {day:'2026-11-05',time:'14:30',id:'pielacinski',title:'Digitalizacja w służbie nauki: Polska kultura muzyczna w perspektywie europejskiej: źródła i konteksty',presenter:'Kamil Pielaciński'},
  {day:'2026-11-05',time:'15:00',event:'Przerwa'},
  {day:'2026-11-05',time:'15:30',id:'myslinski',title:'Pocysterski kościół w Pelplinie w czasach powstawania Tabulatury: nowożytny wystrój i wyposażenie',presenter:'Bartosz Myśliński'},
  {day:'2026-11-05',time:'16:00',id:'raczkowski',title:'Tabulatury Pelplińskie – dezyderaty i postulaty naukowo-badawcze oraz konserwatorskie',presenter:'Juliusz Raczkowski'},
  {day:'2026-11-05',time:'17:30',event:'Zwiedzanie Katedry z przewodnikiem'},
  /*{day:'2026-11-05',time:'19:00',event:'Obiad konferencyjny'},*/
  {day:'2026-11-06',time:'10:00',id:'poniatowski',title:'',presenter:'Kamil Poniatowski'},
  {day:'2026-11-06',time:'10:30',id:'sapp-iwaszko',title:'Nowe metody transkrypcji repertuaru Tabulatur Pelplińskich',presenter:'Craig Sapp, Jacek Iwaszko'},
  {day:'2026-11-06',time:'11:00',event:'Przerwa'},
  {day:'2026-11-06',time:'11:30',id:'tofetti',title:'Instrumental Canzonas by Italian Composers in the Pelplin Tablature: A Preliminary Critical Survey',presenter:'Marina Tofetti'},
  {day:'2026-11-06',time:'12:00',id:'twardowski',title:'Recepcja pierwowzorów madrygałowych kontrafaktur Orfea Vecchiego zawartych w Tabulaturze Pelplińskiej',presenter:'Stanisław Twardowski'},
  {day:'2026-11-06',time:'12:30',id:'patalas',title:'Utwory Asprilia Pacellego w tabulaturze pelplińskiej',presenter:'Aleksandra Patalas'},
  {day:'2026-11-06',time:'13:00',event:'Przerwa obiadowa'},
  {day:'2026-11-06',time:'14:30',id:'chankowska',title:'Quarta Tabulatura Collegii Rigensis na tle tabulatur organowych regionu bałtyckiego',presenter:'Zofia Chankowska'},
  {day:'2026-11-06',time:'15:00',id:'szczerbinin',title:'Tabulatura Pelplińska w świetle repertuaru tabulatury braniewsko-oliwskiej oraz tabulatury S-Uu vmhs 89',presenter:'Artur Szczerbinin'},
  {day:'2026-11-06',time:'15:30',event:'Przerwa'},
  {day:'2026-11-06',time:'16:00',id:'szelest',title:'Tabulatura Pelplińska na pulplicie organisty',presenter:'Marcin Szelest'},
  {day:'2026-11-06',time:'18:00',event:'Koncert', title:'A due voci: Utwory dwugłosowe z Tabulatur Pelplińskich', presenter:'Justyna Adamska – sopran, Tomasz Gozdek - bas, Michał Sawicki - pozytyw', place:'Muzeum Biblii Gutenberga, ul. Biskupa Dominika 11, 83-130 Pelplin'},
  {day:'2026-11-07',time:'10:00',id:'smith',title:'',presenter:'David Smith'},
  {day:'2026-11-07',time:'10:30',id:'wala',title:'Antologia Selectae Cantiones (1614) jako źródło repertuaru dla kopisty Tabulatury Pelplińskiej',presenter:'Antoni Wala'},
  {day:'2026-11-07',time:'11:00',event:'Panel dyskusyjny',presenter:'Irena Bieńkowska, Aleksandra Patalas, Marcin Szelest'},
  {day:'2026-11-07',time:'12:30',event:'Zakończenie konferencji'}
];

const days = [
  {date:'2026-11-05',id:'dzien-1',name:'Czwartek, 5 listopada 2026'},
  {date:'2026-11-06',id:'dzien-2',name:'Piątek, 6 listopada 2026'},
  {date:'2026-11-07',id:'dzien-3',name:'Sobota, 7 listopada 2026'}
];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}


function renderSchedule() {
  const mount = document.getElementById('schedule');

  days.forEach(day => {
    const section = el('section', 'schedule-day');
    section.id = day.id;
    section.setAttribute('aria-label', day.name);
    section.append(el('h3', null, day.name));

    const list = el('div', 'schedule-list');

    schedule.filter(item => item.day === day.date).forEach(item => {
      const isEvent = Boolean(item.event);
      const isConcert = item.event === 'Koncert';
      const isPlaceholder = !isEvent && !item.title;

      const row = el('div',
        'schedule-item' +
        (isEvent ? ' is-event' : '') +
        (isConcert ? ' is-concert' : '') +
        (isPlaceholder ? ' is-placeholder' : '')
      );

      if (item.id) row.id = 'referat-' + item.id;

      row.append(el('time', 'schedule-time', item.time));

      const detail = el('div', 'schedule-detail');

      if (isConcert) {
        // Koncert: tytuł w jednej linii z etykietą
        const title = el('span', 'schedule-title');

        title.append(el('strong', null, 'Koncert: '));
        title.append(el('em', null, item.title || 'Tytuł wkrótce'));

        detail.append(title);

      } else {
        // Pozostałe wydarzenia i referaty
        detail.append(
          el('span', 'schedule-title',
            isEvent ? item.event : (item.title || 'Tytuł referatu wkrótce')
          )
        );
      }

      // Wykonawcy koncertu lub prelegenci referatów
      if (item.presenter) {
        detail.append(el('div', 'schedule-presenter', item.presenter));
      }

      // Miejsce wydarzenia, jeśli zostało podane
      if (item.place) {
        detail.append(el('div', 'schedule-place', item.place));
      }

      row.append(detail);
      list.append(row);
    });

    section.append(list);
    mount.append(section);
  });
}


renderSchedule();

// Popup plakatu + adres z parametrem ?plakat (działa też pod /repozytorium/?plakat).
const dialog = document.getElementById('poster-dialog');
const openButton = document.getElementById('open-poster');
const closeButton = document.getElementById('close-poster');
const posterLink = document.getElementById('poster-link');
const hasPosterParam = () => new URLSearchParams(location.search).has('plakat');
function setPosterParam(enabled) {
  const url = new URL(location.href);
  if (enabled) url.searchParams.set('plakat','');
  else url.searchParams.delete('plakat');
  history.pushState({poster: enabled},'',url);
}
function syncPoster() {
  if (hasPosterParam() && !dialog.open) dialog.showModal();
  if (!hasPosterParam() && dialog.open) dialog.close();
}
function openPoster() {
  if (!hasPosterParam()) setPosterParam(true);
  syncPoster();
}
function closePoster() {
  if (hasPosterParam()) setPosterParam(false);
  syncPoster();
}
openButton.addEventListener('click',openPoster);
posterLink.addEventListener('click',e => { e.preventDefault(); openPoster(); });
closeButton.addEventListener('click',closePoster);
dialog.addEventListener('click',e => { if (e.target === dialog) closePoster(); });
dialog.addEventListener('close',() => { if (hasPosterParam()) closePoster(); });
window.addEventListener('popstate',syncPoster);
syncPoster();

const backToTop = document.getElementById('back-to-top');
function updateBackToTop() { backToTop.classList.toggle('visible',window.scrollY > 400); }
window.addEventListener('scroll',updateBackToTop,{passive:true});
updateBackToTop();
