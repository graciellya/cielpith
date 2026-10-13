import { useState } from 'react';

const paths = {
  sidebar: 'M3 4h18v16H3z M9 4v16',
  back: 'm14 5-7 7 7 7',
  forward: 'm10 5 7 7-7 7',
  search: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z m5-2 6 6',
  reload: 'M19 8a8 8 0 1 0 1 8 M19 3v6h-6',
  share: 'M8 8H4v13h16V8h-4 M12 16V2 m-4 4 4-4 4 4',
  tabs: 'M8 3h13v13H8z M16 16v5H3V8h5',
};

function Icon({ name }) {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

export function SafariToolbar({ title }) {
  const [dark, setDark] = useState(true);
  return (
    <button type="button" className={`safari-toolbar${dark ? '' : ' safari-toolbar--light'}`}
      onClick={event => { event.stopPropagation(); setDark(value => !value); }} aria-pressed={dark}
      aria-label={`Dark toolbar for ${title}`} title="Toggle toolbar light / dark">
      <span className="safari-window-controls"><i /><i /><i /></span>
      <span className="safari-navigation"><Icon name="sidebar" /><Icon name="back" /><Icon name="forward" /></span>
      <span className="safari-address"><Icon name="search" /><span>{title}</span><Icon name="reload" /></span>
      <span className="safari-actions"><Icon name="share" /><Icon name="tabs" /></span>
    </button>
  );
}
