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
    public class PalestrantePersistence : IPalestrantePersistence
    {
        private readonly ProEventosContext _contexto;
        public PalestrantePersistence(ProEventosContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool includeEventos)
        {
            IQueryable<Palestrante> query = _contexto.Palestrantes
                .Include(palestrante => palestrante.RedesSociais);

            if(includeEventos) 
            {
                query = query.Include(palestrante => palestrante.PalestrantesEventos).ThenInclude(palEve => palEve.Evento);
            }

            query = query.AsNoTracking().OrderBy(palestrante => palestrante.Id).Where(palestrante => palestrante.Nome.ToLower().Contains(Nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _contexto.Palestrantes
                .Include(palestrante => palestrante.RedesSociais);

            if(includeEventos) 
            {
                query = query.Include(palestrante => palestrante.PalestrantesEventos).ThenInclude(palEve => palEve.Evento);
            }

            query = query.AsNoTracking().OrderBy(palestrante => palestrante.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetAllPalestranteByIdAsync(int PalestranteId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _contexto.Palestrantes
                .Include(palestrante => palestrante.RedesSociais);

            if(includeEventos) 
            {
                query = query.Include(palestrante => palestrante.PalestrantesEventos).ThenInclude(palEve => palEve.Evento);
            }

            query = query.AsNoTracking().OrderBy(palestrante => palestrante.Id).Where(palestrante => palestrante.Id == PalestranteId);

            return await query.FirstOrDefaultAsync();
        }
    }
}