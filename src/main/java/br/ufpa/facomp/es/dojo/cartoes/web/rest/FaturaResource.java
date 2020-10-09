package br.ufpa.facomp.es.dojo.cartoes.web.rest;

import br.ufpa.facomp.es.dojo.cartoes.domain.Fatura;
import br.ufpa.facomp.es.dojo.cartoes.repository.FaturaRepository;
import br.ufpa.facomp.es.dojo.cartoes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.ufpa.facomp.es.dojo.cartoes.domain.Fatura}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FaturaResource {

    private final Logger log = LoggerFactory.getLogger(FaturaResource.class);

    private static final String ENTITY_NAME = "fatura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FaturaRepository faturaRepository;

    public FaturaResource(FaturaRepository faturaRepository) {
        this.faturaRepository = faturaRepository;
    }

    /**
     * {@code POST  /faturas} : Create a new fatura.
     *
     * @param fatura the fatura to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fatura, or with status {@code 400 (Bad Request)} if the fatura has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/faturas")
    public ResponseEntity<Fatura> createFatura(@RequestBody Fatura fatura) throws URISyntaxException {
        log.debug("REST request to save Fatura : {}", fatura);
        if (fatura.getId() != null) {
            throw new BadRequestAlertException("A new fatura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fatura result = faturaRepository.save(fatura);
        return ResponseEntity.created(new URI("/api/faturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /faturas} : Updates an existing fatura.
     *
     * @param fatura the fatura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fatura,
     * or with status {@code 400 (Bad Request)} if the fatura is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fatura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/faturas")
    public ResponseEntity<Fatura> updateFatura(@RequestBody Fatura fatura) throws URISyntaxException {
        log.debug("REST request to update Fatura : {}", fatura);
        if (fatura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fatura result = faturaRepository.save(fatura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fatura.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /faturas} : get all the faturas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of faturas in body.
     */
    @GetMapping("/faturas")
    public List<Fatura> getAllFaturas() {
        log.debug("REST request to get all Faturas");
        return faturaRepository.findAll();
    }

    /**
     * {@code GET  /faturas/:id} : get the "id" fatura.
     *
     * @param id the id of the fatura to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fatura, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/faturas/{id}")
    public ResponseEntity<Fatura> getFatura(@PathVariable Long id) {
        log.debug("REST request to get Fatura : {}", id);
        Optional<Fatura> fatura = faturaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fatura);
    }

    /**
     * {@code DELETE  /faturas/:id} : delete the "id" fatura.
     *
     * @param id the id of the fatura to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/faturas/{id}")
    public ResponseEntity<Void> deleteFatura(@PathVariable Long id) {
        log.debug("REST request to delete Fatura : {}", id);
        faturaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
