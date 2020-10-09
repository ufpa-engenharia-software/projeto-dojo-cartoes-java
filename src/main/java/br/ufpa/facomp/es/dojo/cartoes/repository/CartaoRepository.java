package br.ufpa.facomp.es.dojo.cartoes.repository;

import br.ufpa.facomp.es.dojo.cartoes.domain.Cartao;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cartao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Long> {
}
