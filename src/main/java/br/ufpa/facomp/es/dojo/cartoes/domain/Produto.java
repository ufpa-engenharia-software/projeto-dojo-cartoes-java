package br.ufpa.facomp.es.dojo.cartoes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Produto.
 */
@Entity
@Table(name = "produto")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "local")
    private String local;

    @Column(name = "data_compra")
    private ZonedDateTime dataCompra;

    @Column(name = "valor")
    private Float valor;

    @ManyToOne
    @JsonIgnoreProperties(value = "produtos", allowSetters = true)
    private Fatura fatura;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Produto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLocal() {
        return local;
    }

    public Produto local(String local) {
        this.local = local;
        return this;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public ZonedDateTime getDataCompra() {
        return dataCompra;
    }

    public Produto dataCompra(ZonedDateTime dataCompra) {
        this.dataCompra = dataCompra;
        return this;
    }

    public void setDataCompra(ZonedDateTime dataCompra) {
        this.dataCompra = dataCompra;
    }

    public Float getValor() {
        return valor;
    }

    public Produto valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public Fatura getFatura() {
        return fatura;
    }

    public Produto fatura(Fatura fatura) {
        this.fatura = fatura;
        return this;
    }

    public void setFatura(Fatura fatura) {
        this.fatura = fatura;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produto)) {
            return false;
        }
        return id != null && id.equals(((Produto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produto{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", local='" + getLocal() + "'" +
            ", dataCompra='" + getDataCompra() + "'" +
            ", valor=" + getValor() +
            "}";
    }
}
