'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Star, Shield, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'

const features = [
  {
    icon: MapPin,
    title: 'Masanı Gör, Seç',
    desc: 'Restoranın kat planını görsel olarak incele. Pencere kenarı mı, teras mı? Sen karar ver.',
    color: '#7c3aed', // violet-600
  },
  {
    icon: Zap,
    title: 'Gerçek Zamanlı',
    desc: 'Bir başkası masayı tuttuğu an, ekranında anında kırmızıya döner. Sürpriz yok.',
    color: '#2563eb', // blue-600
  },
  {
    icon: Shield,
    title: 'Güven Puanı',
    desc: 'Söz verip gittiğinde puan kazan. VIP masalara erişim hakkı kazan.',
    color: '#059669', // emerald-600
  },
]

const steps = [
  { num: '01', title: 'Restoranı Seç', desc: 'Semte ve mekan tipine göre filtrele.' },
  { num: '02', title: 'Masanı Seç', desc: 'Kat planından tam istediğin masayı tıkla.' },
  { num: '03', title: 'SMS ile Doğrula', desc: 'Telefon numaranı gir, kodu yaz, bitti.' },
]

export default function HomePage() {
  return (
    <main style={{
      backgroundColor: '#0a0a0f',
      color: '#f0f0f8',
      minHeight: '100vh',
      overflowX: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '100px',
        paddingLeft: '20px',
        paddingRight: '20px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Gradients */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(108,99,255,0.1)',
            border: '1px solid rgba(108,99,255,0.3)',
            color: '#a78bfa',
            marginBottom: '32px',
            fontSize: '14px',
            fontWeight: 500
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#34d399',
              display: 'inline-block'
            }} />
            Türkiye'nin İlk Görsel Rezervasyon Platformu
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '32px',
            letterSpacing: '-0.02em'
          }}>
            Kör Randevuya <br />
            <span style={{
              background: 'linear-gradient(to right, #6c63ff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: '#a78bfa'
            }}>Son.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: '#9ca3af',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Masanı gör, seç, rezerve et. Tuvalet yanı mı, cam kenarı mı?{' '}
            <span style={{ color: '#fff', fontWeight: 600 }}>Artık sen karar veriyorsun.</span>
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link
              href="/restaurants"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                borderRadius: '16px',
                fontWeight: 700,
                color: '#fff',
                background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                boxShadow: '0 0 30px rgba(108,99,255,0.4)',
                fontSize: '18px',
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
            >
              Restoranları Keşfet
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/admin/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                borderRadius: '16px',
                fontWeight: 700,
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '18px',
                textDecoration: 'none'
              }}
            >
              Restoran Paneli
            </Link>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '32px',
            maxWidth: '600px',
            margin: '80px auto 0'
          }}>
            {[
              { val: '4.9', label: 'Ortalama Puan' },
              { val: '2.400+', label: 'Başarılı Rezervasyon' },
              { val: '%94', label: 'Memnuniyet Oranı' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  background: 'linear-gradient(to right, #6c63ff, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: '#a78bfa'
                }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px' }}>
            Neden <span style={{
              background: 'linear-gradient(to right, #6c63ff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: '#a78bfa'
            }}>Seat & Eat?</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#9ca3af' }}>Restoran rezervasyonunu yeniden tanımlıyoruz.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                padding: '32px',
                borderRadius: '24px',
                backgroundColor: '#16161f',
                border: '1px solid #2a2a3a'
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: f.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: `0 10px 20px ${f.color}40`
              }}>
                <f.icon size={26} color="#fff" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ backgroundColor: '#111118', padding: '100px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '16px' }}>
              3 Adımda <span style={{
                background: 'linear-gradient(to right, #6c63ff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#a78bfa'
              }}>Rezervasyon</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gap: '24px' }}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '32px',
                  padding: '32px',
                  borderRadius: '24px',
                  backgroundColor: '#16161f',
                  border: '1px solid #2a2a3a'
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: '#6c63ff',
                  opacity: 0.8,
                  width: '100px',
                  textAlign: 'center',
                  flexShrink: 0
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Score Section */}
      <section style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🏆</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '24px' }}>Güven Puanı Sistemi</h2>
        <p style={{ fontSize: '1.25rem', color: '#9ca3af', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
          Rezervasyonuna gittiğinde <span style={{ color: '#34d399', fontWeight: 700 }}>+10 puan</span> kazan.
          Gitmezsen <span style={{ color: '#f87171', fontWeight: 700 }}>-30 puan</span> kaybet.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {[
            { tier: 'Yeni Üye', score: '0–70', color: '#f59e0b', emoji: '🌱' },
            { tier: 'Güvenilir', score: '70–150', color: '#22c55e', emoji: '✅' },
            { tier: 'VIP', score: '150+', color: '#a78bfa', emoji: '👑' },
          ].map((t, i) => (
            <div key={i} style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#16161f',
              border: `1px solid ${t.color}33`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{t.emoji}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: t.color }}>{t.tier}</div>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>{t.score} puan</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid #2a2a3a',
        color: '#6b7280'
      }}>
        <p>© 2026 Seat & Eat. Tüm hakları saklıdır.</p>
      </footer>
    </main>
  )
}
