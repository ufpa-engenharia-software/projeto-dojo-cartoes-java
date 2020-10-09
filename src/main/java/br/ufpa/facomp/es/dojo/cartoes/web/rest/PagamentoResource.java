package br.ufpa.facomp.es.dojo.cartoes.web.rest;

import br.ufpa.facomp.es.dojo.cartoes.domain.Pagamento;
import br.ufpa.facomp.es.dojo.cartoes.repository.PagamentoRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link br.ufpa.facomp.es.dojo.cartoes.domain.Pagamento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PagamentoResource {

    private final Logger log = LoggerFactory.getLogger(PagamentoResource.class);

    private static final String ENTITY_NAME = "pagamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagamentoRepository pagamentoRepository;

    public PagamentoResource(PagamentoRepository pagamentoRepository) {
        this.pagamentoRepository = pagamentoRepository;
    }

    /**
     * {@code POST  /pagamentos} : Create a new pagamento.
     *
     * @param pagamento the pagamento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pagamento, or with status {@code 400 (Bad Request)} if the pagamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pagamentos")
    public ResponseEntity<Pagamento> createPagamento(@RequestBody Pagamento pagamento) throws URISyntaxException {
        log.debug("REST request to save Pagamento : {}", pagamento);
        if (pagamento.getId() != null) {
            throw new BadRequestAlertException("A new pagamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pagamento result = pagamentoRepository.save(pagamento);
        return ResponseEntity.created(new URI("/api/pagamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pagamentos} : Updates an existing pagamento.
     *
     * @param pagamento the pagamento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagamento,
     * or with status {@code 400 (Bad Request)} if the pagamento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pagamento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pagamentos")
    public ResponseEntity<Pagamento> updatePagamento(@RequestBody Pagamento pagamento) throws URISyntaxException {
        log.debug("REST request to update Pagamento : {}", pagamento);
        if (pagamento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pagamento result = pagamentoRepository.save(pagamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pagamento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pagamentos} : get all the pagamentos.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagamentos in body.
     */
    @GetMapping("/pagamentos")
    public List<Pagamento> getAllPagamentos(@RequestParam(required = false) String filter) {
        if ("fatura-is-null".equals(filter)) {
            log.debug("REST request to get all Pagamentos where fatura is null");
            return StreamSupport
                .stream(pagamentoRepository.findAll().spliterator(), false)
                .filter(pagamento -> pagamento.getFatura() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Pagamentos");
        return pagamentoRepository.findAll();
    }

    /**
     * {@code GET  /pagamentos/:id} : get the "id" pagamento.
     *
     * @param id the id of the pagamento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pagamento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pagamentos/{id}")
    public ResponseEntity<Pagamento> getPagamento(@PathVariable Long id) {
        log.debug("REST request to get Pagamento : {}", id);
        Optional<Pagamento> pagamento = pagamentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pagamento);
    }

    /**
     * {@code DELETE  /pagamentos/:id} : delete the "id" pagamento.
     *
     * @param id the id of the pagamento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pagamentos/{id}")
    public ResponseEntity<Void> deletePagamento(@PathVariable Long id) {
        log.debug("REST request to delete Pagamento : {}", id);
        pagamentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
