package br.ufpa.facomp.es.dojo.cartoes.repository;

import br.ufpa.facomp.es.dojo.cartoes.domain.Fatura;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fatura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaturaRepository extends JpaRepository<Fatura, Long> {
}
