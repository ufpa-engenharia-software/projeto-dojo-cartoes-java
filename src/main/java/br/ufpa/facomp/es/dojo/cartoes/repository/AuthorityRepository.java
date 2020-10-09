package br.ufpa.facomp.es.dojo.cartoes.repository;

import br.ufpa.facomp.es.dojo.cartoes.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
