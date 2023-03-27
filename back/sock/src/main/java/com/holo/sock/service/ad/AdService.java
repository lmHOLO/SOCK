package com.holo.sock.service.ad;

import com.holo.sock.entity.ad.Ad;
import com.holo.sock.repository.ad.AdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdService {

    private final AdRepository adRepository;

    public List<String> adList(){
        List<Ad> ads = adRepository.findAll();
        return ads.stream().map(Ad::getImage).collect(Collectors.toList());
    }
}
