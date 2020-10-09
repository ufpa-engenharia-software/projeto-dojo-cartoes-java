package br.ufpa.facomp.es.dojo.cartoes.repository;

import br.ufpa.facomp.es.dojo.cartoes.domain.Pagamento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pagamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
}
