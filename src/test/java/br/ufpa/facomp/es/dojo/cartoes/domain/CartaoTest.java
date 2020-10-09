package br.ufpa.facomp.es.dojo.cartoes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.ufpa.facomp.es.dojo.cartoes.web.rest.TestUtil;

public class CartaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cartao.class);
        Cartao cartao1 = new Cartao();
        cartao1.setId(1L);
        Cartao cartao2 = new Cartao();
        cartao2.setId(cartao1.getId());
        assertThat(cartao1).isEqualTo(cartao2);
        cartao2.setId(2L);
        assertThat(cartao1).isNotEqualTo(cartao2);
        cartao1.setId(null);
        assertThat(cartao1).isNotEqualTo(cartao2);
    }
}
