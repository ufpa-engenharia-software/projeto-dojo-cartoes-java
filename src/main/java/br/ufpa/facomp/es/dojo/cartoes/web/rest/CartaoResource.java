package br.ufpa.facomp.es.dojo.cartoes.web.rest;

import br.ufpa.facomp.es.dojo.cartoes.domain.Cartao;
import br.ufpa.facomp.es.dojo.cartoes.repository.CartaoRepository;
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
 * REST controller for managing {@link br.ufpa.facomp.es.dojo.cartoes.domain.Cartao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CartaoResource {

    private final Logger log = LoggerFactory.getLogger(CartaoResource.class);

    private static final String ENTITY_NAME = "cartao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CartaoRepository cartaoRepository;

    public CartaoResource(CartaoRepository cartaoRepository) {
        this.cartaoRepository = cartaoRepository;
    }

    /**
     * {@code POST  /cartaos} : Create a new cartao.
     *
     * @param cartao the cartao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cartao, or with status {@code 400 (Bad Request)} if the cartao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cartaos")
    public ResponseEntity<Cartao> createCartao(@RequestBody Cartao cartao) throws URISyntaxException {
        log.debug("REST request to save Cartao : {}", cartao);
        if (cartao.getId() != null) {
            throw new BadRequestAlertException("A new cartao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cartao result = cartaoRepository.save(cartao);
        return ResponseEntity.created(new URI("/api/cartaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cartaos} : Updates an existing cartao.
     *
     * @param cartao the cartao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cartao,
     * or with status {@code 400 (Bad Request)} if the cartao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cartao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cartaos")
    public ResponseEntity<Cartao> updateCartao(@RequestBody Cartao cartao) throws URISyntaxException {
        log.debug("REST request to update Cartao : {}", cartao);
        if (cartao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cartao result = cartaoRepository.save(cartao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cartaos} : get all the cartaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cartaos in body.
     */
    @GetMapping("/cartaos")
    public List<Cartao> getAllCartaos() {
        log.debug("REST request to get all Cartaos");
        return cartaoRepository.findAll();
    }

    /**
     * {@code GET  /cartaos/:id} : get the "id" cartao.
     *
     * @param id the id of the cartao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cartao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cartaos/{id}")
    public ResponseEntity<Cartao> getCartao(@PathVariable Long id) {
        log.debug("REST request to get Cartao : {}", id);
        Optional<Cartao> cartao = cartaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cartao);
    }

    /**
     * {@code DELETE  /cartaos/:id} : delete the "id" cartao.
     *
     * @param id the id of the cartao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cartaos/{id}")
    public ResponseEntity<Void> deleteCartao(@PathVariable Long id) {
        log.debug("REST request to delete Cartao : {}", id);
        cartaoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
