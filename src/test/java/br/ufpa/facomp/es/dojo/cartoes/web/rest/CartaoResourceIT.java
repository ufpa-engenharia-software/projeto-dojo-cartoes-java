package br.ufpa.facomp.es.dojo.cartoes.web.rest;

import br.ufpa.facomp.es.dojo.cartoes.ProjetoDojoCartoesApp;
import br.ufpa.facomp.es.dojo.cartoes.domain.Cartao;
import br.ufpa.facomp.es.dojo.cartoes.repository.CartaoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufpa.facomp.es.dojo.cartoes.domain.enumeration.StatusCartao;
/**
 * Integration tests for the {@link CartaoResource} REST controller.
 */
@SpringBootTest(classes = ProjetoDojoCartoesApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CartaoResourceIT {

    private static final String DEFAULT_NDIGITOS = "AAAAAAAAAA";
    private static final String UPDATED_NDIGITOS = "BBBBBBBBBB";

    private static final StatusCartao DEFAULT_STATUS = StatusCartao.BLOQUEADO;
    private static final StatusCartao UPDATED_STATUS = StatusCartao.LIBERADO;

    private static final String DEFAULT_NOMETITULAR = "AAAAAAAAAA";
    private static final String UPDATED_NOMETITULAR = "BBBBBBBBBB";

    private static final Integer DEFAULT_CODSEGURANCA = 1;
    private static final Integer UPDATED_CODSEGURANCA = 2;

    private static final Double DEFAULT_LIMITECREDITO = 1D;
    private static final Double UPDATED_LIMITECREDITO = 2D;

    private static final LocalDate DEFAULT_DATAVENCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATAVENCIMENTO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CartaoRepository cartaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCartaoMockMvc;

    private Cartao cartao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cartao createEntity(EntityManager em) {
        Cartao cartao = new Cartao()
            .ndigitos(DEFAULT_NDIGITOS)
            .status(DEFAULT_STATUS)
            .nometitular(DEFAULT_NOMETITULAR)
            .codseguranca(DEFAULT_CODSEGURANCA)
            .limitecredito(DEFAULT_LIMITECREDITO)
            .datavencimento(DEFAULT_DATAVENCIMENTO);
        return cartao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cartao createUpdatedEntity(EntityManager em) {
        Cartao cartao = new Cartao()
            .ndigitos(UPDATED_NDIGITOS)
            .status(UPDATED_STATUS)
            .nometitular(UPDATED_NOMETITULAR)
            .codseguranca(UPDATED_CODSEGURANCA)
            .limitecredito(UPDATED_LIMITECREDITO)
            .datavencimento(UPDATED_DATAVENCIMENTO);
        return cartao;
    }

    @BeforeEach
    public void initTest() {
        cartao = createEntity(em);
    }

    @Test
    @Transactional
    public void createCartao() throws Exception {
        int databaseSizeBeforeCreate = cartaoRepository.findAll().size();
        // Create the Cartao
        restCartaoMockMvc.perform(post("/api/cartaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartao)))
            .andExpect(status().isCreated());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeCreate + 1);
        Cartao testCartao = cartaoList.get(cartaoList.size() - 1);
        assertThat(testCartao.getNdigitos()).isEqualTo(DEFAULT_NDIGITOS);
        assertThat(testCartao.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testCartao.getNometitular()).isEqualTo(DEFAULT_NOMETITULAR);
        assertThat(testCartao.getCodseguranca()).isEqualTo(DEFAULT_CODSEGURANCA);
        assertThat(testCartao.getLimitecredito()).isEqualTo(DEFAULT_LIMITECREDITO);
        assertThat(testCartao.getDatavencimento()).isEqualTo(DEFAULT_DATAVENCIMENTO);
    }

    @Test
    @Transactional
    public void createCartaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cartaoRepository.findAll().size();

        // Create the Cartao with an existing ID
        cartao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCartaoMockMvc.perform(post("/api/cartaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartao)))
            .andExpect(status().isBadRequest());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCartaos() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        // Get all the cartaoList
        restCartaoMockMvc.perform(get("/api/cartaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartao.getId().intValue())))
            .andExpect(jsonPath("$.[*].ndigitos").value(hasItem(DEFAULT_NDIGITOS)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].nometitular").value(hasItem(DEFAULT_NOMETITULAR)))
            .andExpect(jsonPath("$.[*].codseguranca").value(hasItem(DEFAULT_CODSEGURANCA)))
            .andExpect(jsonPath("$.[*].limitecredito").value(hasItem(DEFAULT_LIMITECREDITO.doubleValue())))
            .andExpect(jsonPath("$.[*].datavencimento").value(hasItem(DEFAULT_DATAVENCIMENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getCartao() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        // Get the cartao
        restCartaoMockMvc.perform(get("/api/cartaos/{id}", cartao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cartao.getId().intValue()))
            .andExpect(jsonPath("$.ndigitos").value(DEFAULT_NDIGITOS))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.nometitular").value(DEFAULT_NOMETITULAR))
            .andExpect(jsonPath("$.codseguranca").value(DEFAULT_CODSEGURANCA))
            .andExpect(jsonPath("$.limitecredito").value(DEFAULT_LIMITECREDITO.doubleValue()))
            .andExpect(jsonPath("$.datavencimento").value(DEFAULT_DATAVENCIMENTO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCartao() throws Exception {
        // Get the cartao
        restCartaoMockMvc.perform(get("/api/cartaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCartao() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        int databaseSizeBeforeUpdate = cartaoRepository.findAll().size();

        // Update the cartao
        Cartao updatedCartao = cartaoRepository.findById(cartao.getId()).get();
        // Disconnect from session so that the updates on updatedCartao are not directly saved in db
        em.detach(updatedCartao);
        updatedCartao
            .ndigitos(UPDATED_NDIGITOS)
            .status(UPDATED_STATUS)
            .nometitular(UPDATED_NOMETITULAR)
            .codseguranca(UPDATED_CODSEGURANCA)
            .limitecredito(UPDATED_LIMITECREDITO)
            .datavencimento(UPDATED_DATAVENCIMENTO);

        restCartaoMockMvc.perform(put("/api/cartaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCartao)))
            .andExpect(status().isOk());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeUpdate);
        Cartao testCartao = cartaoList.get(cartaoList.size() - 1);
        assertThat(testCartao.getNdigitos()).isEqualTo(UPDATED_NDIGITOS);
        assertThat(testCartao.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCartao.getNometitular()).isEqualTo(UPDATED_NOMETITULAR);
        assertThat(testCartao.getCodseguranca()).isEqualTo(UPDATED_CODSEGURANCA);
        assertThat(testCartao.getLimitecredito()).isEqualTo(UPDATED_LIMITECREDITO);
        assertThat(testCartao.getDatavencimento()).isEqualTo(UPDATED_DATAVENCIMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingCartao() throws Exception {
        int databaseSizeBeforeUpdate = cartaoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCartaoMockMvc.perform(put("/api/cartaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartao)))
            .andExpect(status().isBadRequest());

        // Validate the Cartao in the database
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCartao() throws Exception {
        // Initialize the database
        cartaoRepository.saveAndFlush(cartao);

        int databaseSizeBeforeDelete = cartaoRepository.findAll().size();

        // Delete the cartao
        restCartaoMockMvc.perform(delete("/api/cartaos/{id}", cartao.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cartao> cartaoList = cartaoRepository.findAll();
        assertThat(cartaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
