package br.ufpa.facomp.es.dojo.cartoes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import br.ufpa.facomp.es.dojo.cartoes.domain.enumeration.StatusFatura;

/**
 * A Fatura.
 */
@Entity
@Table(name = "fatura")
public class Fatura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_de_processamento")
    private LocalDate dataDeProcessamento;

    @Column(name = "valor_total")
    private Double valorTotal;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusFatura status;

    @Column(name = "pontuacao_ganhar")
    private String pontuacaoGanhar;

    @OneToOne
    @JoinColumn(unique = true)
    private Pagamento pagamento;

    @OneToMany(mappedBy = "fatura")
    private Set<Produto> produtos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "faturas", allowSetters = true)
    private Cartao cartao;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataDeProcessamento() {
        return dataDeProcessamento;
    }

    public Fatura dataDeProcessamento(LocalDate dataDeProcessamento) {
        this.dataDeProcessamento = dataDeProcessamento;
        return this;
    }

    public void setDataDeProcessamento(LocalDate dataDeProcessamento) {
        this.dataDeProcessamento = dataDeProcessamento;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public Fatura valorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public StatusFatura getStatus() {
        return status;
    }

    public Fatura status(StatusFatura status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusFatura status) {
        this.status = status;
    }

    public String getPontuacaoGanhar() {
        return pontuacaoGanhar;
    }

    public Fatura pontuacaoGanhar(String pontuacaoGanhar) {
        this.pontuacaoGanhar = pontuacaoGanhar;
        return this;
    }

    public void setPontuacaoGanhar(String pontuacaoGanhar) {
        this.pontuacaoGanhar = pontuacaoGanhar;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public Fatura pagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
        return this;
    }

    public void setPagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
    }

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public Fatura produtos(Set<Produto> produtos) {
        this.produtos = produtos;
        return this;
    }

    public Fatura addProduto(Produto produto) {
        this.produtos.add(produto);
        produto.setFatura(this);
        return this;
    }

    public Fatura removeProduto(Produto produto) {
        this.produtos.remove(produto);
        produto.setFatura(null);
        return this;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
    }

    public Cartao getCartao() {
        return cartao;
    }

    public Fatura cartao(Cartao cartao) {
        this.cartao = cartao;
        return this;
    }

    public void setCartao(Cartao cartao) {
        this.cartao = cartao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fatura)) {
            return false;
        }
        return id != null && id.equals(((Fatura) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fatura{" +
            "id=" + getId() +
            ", dataDeProcessamento='" + getDataDeProcessamento() + "'" +
            ", valorTotal=" + getValorTotal() +
            ", status='" + getStatus() + "'" +
            ", pontuacaoGanhar='" + getPontuacaoGanhar() + "'" +
            "}";
    }
}
