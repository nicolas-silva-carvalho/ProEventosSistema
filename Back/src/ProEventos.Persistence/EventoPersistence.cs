using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;
namespace ProEventos.Persistence
{
    public class EventoPersistence : IEventoPersistence
    {
        private readonly ProEventosContext _contexto;
        public EventoPersistence(ProEventosContext contexto)
        {
            _contexto = contexto;
            _contexto.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrante = false)
        {
            IQueryable<Evento> query = _contexto.Eventos
                .Include(evento => evento.Lotes)
                .Include(evento => evento.RedesSociais);

            if(includePalestrante) 
            {
                query = query.Include(evento => evento.PalestrantesEventos).ThenInclude(palEve => palEve.Palestrante);
            }

            query = query.OrderBy(evento => evento.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrante = false)
        {
            IQueryable<Evento> query = _contexto.Eventos.Include(evento => evento.Lotes).Include(evento => evento.RedesSociais);

            if(includePalestrante) 
            {
                query = query.Include(evento => evento.PalestrantesEventos).ThenInclude(palEve => palEve.Palestrante);
            }

            query = query.OrderBy(evento => evento.Id)
                .Where(evento => evento.Tema.ToLower()
                .Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int EventoId, bool includePalestrante = false)
        {
            IQueryable<Evento> query = _contexto.Eventos.Include(evento => evento.Lotes).Include(evento => evento.RedesSociais);

            if(includePalestrante) 
            {
                query = query.Include(evento => evento.PalestrantesEventos).ThenInclude(palEve => palEve.Palestrante);
            }

            query = query.OrderBy(evento => evento.Id)
                .Where(evento => evento.Id == EventoId);

            return await query.FirstOrDefaultAsync();
        }
    }
}