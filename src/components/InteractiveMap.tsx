import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Branch {
  id: number;
  name: string;
  shortName: string;
  manager: string;
  managerTitle: string;
  address: string;
  email: string;
  phone: string;
  x: number;
  y: number;
  district: string;
}

const branches: Branch[] = [
  {
    id: 1,
    name: 'АО "Дельта-Агро"',
    shortName: 'Дельта-Агро',
    manager: 'Крейс Владимир Александрович',
    managerTitle: 'Генеральный директор',
    address: '403341, Волгоградская область, г. Михайловка, пер. Боинский, д. 3А',
    email: 'delta_agro@bk.ru',
    phone: '8 (84463) 2-40-26, 2-62-85',
    x: 35,
    y: 30,
    district: 'Михайловский район'
  },
  {
    id: 2,
    name: 'ОП "Раздолье-Михайловка"',
    shortName: 'Раздолье-Михайловка',
    manager: 'Засыпкин Александр Александрович',
    managerTitle: 'Управляющий',
    address: '403334, Волгоградская обл., Михайловский р-н, х. Карагичевский, ул. Ленина, 6',
    email: 'kardelta_agro@mail.ru',
    phone: '8 (8443) 6-62-50',
    x: 32,
    y: 35,
    district: 'Михайловский район'
  },
  {
    id: 3,
    name: 'ОП "Раздолье-Рудня"',
    shortName: 'Раздолье-Рудня',
    manager: 'Демченко Алексей Николаевич',
    managerTitle: 'Управляющий',
    address: '403601, Волгоградская область, р.п. Рудня, ул. Комсомольская, 3',
    email: 'razdole.rud@mail.ru',
    phone: '8 (84453) 7-11-32',
    x: 45,
    y: 25,
    district: 'Руднянский район'
  },
  {
    id: 4,
    name: 'ОП "Раздолье-Жирновск"',
    shortName: 'Раздолье-Жирновск',
    manager: 'Карякин Николай Николаевич',
    managerTitle: 'Управляющий',
    address: '403764, Волгоградская область, Жирновский район, с. Кленовка, ул. Продольная, 2',
    email: 'zhirnovsk@bk.ru',
    phone: '—',
    x: 55,
    y: 20,
    district: 'Жирновский район'
  },
  {
    id: 5,
    name: 'ХПП Матышево',
    shortName: 'ХПП Матышево',
    manager: 'Бобылев Вадим Николаевич',
    managerTitle: 'Управляющий',
    address: '403617, Волгоградская область, Руднянский район, с. Матышево, д. 1',
    email: 'hppmatishevo@mail.ru',
    phone: '—',
    x: 48,
    y: 30,
    district: 'Руднянский район'
  },
  {
    id: 6,
    name: 'ОП "Раздолье-Медведицкое"',
    shortName: 'Раздолье-Медведицкое',
    manager: 'Димитров Алексей Дмитриевич',
    managerTitle: 'Управляющий',
    address: '403772, Волгоградская область, Жирновский р-н, пром.зона №1, производственная база',
    email: 'nikomnataliay@rambler.ru',
    phone: '8 (84454) 6-48-83',
    x: 58,
    y: 25,
    district: 'Жирновский район'
  }
];

const InteractiveMap = () => {
  const [hoveredBranch, setHoveredBranch] = useState<Branch | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4 flex-wrap">
        <Badge className="bg-primary text-white text-base px-4 py-2">
          <Icon name="MapPin" size={16} className="mr-2" />
          Волгоградская область
        </Badge>
        <Badge variant="outline" className="text-base px-4 py-2">
          6 подразделений в 3 районах
        </Badge>
      </div>

      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-blue-100 via-emerald-50 to-green-100 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/30">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
        >
          <defs>
            <radialGradient id="mapBg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#d1fae5" />
            </radialGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3"/>
            </filter>

            <linearGradient id="districtGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="districtGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#65a30d" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="districtGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
            </linearGradient>

            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#10b981" strokeWidth="0.1" opacity="0.1"/>
            </pattern>
          </defs>

          <rect width="100" height="100" fill="url(#mapBg)" />
          <rect width="100" height="100" fill="url(#grid)" opacity="0.3" />

          <path
            d="M 15 15 L 25 12 L 40 10 L 55 8 L 70 10 L 80 15 L 85 25 L 87 40 L 85 55 L 80 65 L 70 72 L 55 75 L 40 73 L 25 68 L 15 60 L 10 45 L 12 30 Z"
            fill="url(#mapBg)"
            stroke="#10b981"
            strokeWidth="0.8"
            strokeLinejoin="round"
            filter="url(#shadow)"
            opacity="0.7"
          />

          <path
            d="M 15 15 L 25 12 L 40 10 L 55 8 L 70 10 L 80 15 L 85 25 L 87 40 L 85 55 L 80 65 L 70 72 L 55 75 L 40 73 L 25 68 L 15 60 L 10 45 L 12 30 Z"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeDasharray="3,2"
            opacity="0.6"
          />

          <g opacity="0.4">
            <path
              d="M 15 15 L 25 12 L 40 10 L 42 30 L 35 45 L 25 50 L 15 45 Z"
              fill="url(#districtGrad1)"
              stroke="#10b981"
              strokeWidth="0.4"
              strokeDasharray="1,1"
            />
            <text x="27" y="32" fontSize="3" fill="#059669" fontWeight="600" opacity="0.7">Михайловский</text>
          </g>

          <g opacity="0.4">
            <path
              d="M 40 10 L 55 8 L 65 12 L 65 30 L 55 35 L 42 30 Z"
              fill="url(#districtGrad2)"
              stroke="#84cc16"
              strokeWidth="0.4"
              strokeDasharray="1,1"
            />
            <text x="48" y="22" fontSize="3" fill="#65a30d" fontWeight="600" opacity="0.7">Руднянский</text>
          </g>

          <g opacity="0.4">
            <path
              d="M 55 8 L 70 10 L 80 15 L 75 30 L 65 30 L 65 12 Z"
              fill="url(#districtGrad3)"
              stroke="#fbbf24"
              strokeWidth="0.4"
              strokeDasharray="1,1"
            />
            <text x="63" y="18" fontSize="3" fill="#f59e0b" fontWeight="600" opacity="0.7">Жирновский</text>
          </g>

          {branches.map((branch, idx) => {
            if (idx < branches.length - 1) {
              return (
                <line
                  key={`connection-${branch.id}`}
                  x1={branch.x}
                  y1={branch.y}
                  x2={branches[idx + 1].x}
                  y2={branches[idx + 1].y}
                  stroke="#10b981"
                  strokeWidth="0.3"
                  strokeDasharray="1.5,1.5"
                  opacity="0.25"
                />
              );
            }
            return null;
          })}

          {branches.map((branch) => {
            const isHQ = branch.id === 1;
            const size = isHQ ? 6 : 4.5;
            const isHovered = hoveredBranch?.id === branch.id;
            const isSelected = selectedBranch?.id === branch.id;

            return (
              <g key={branch.id}>
                {(isHovered || isSelected) && (
                  <>
                    <circle
                      cx={branch.x}
                      cy={branch.y}
                      r={size + 5}
                      fill={isHQ ? '#10b981' : '#84cc16'}
                      opacity="0.15"
                      className="animate-ping"
                      style={{ animationDuration: '2s' }}
                    />
                    <circle
                      cx={branch.x}
                      cy={branch.y}
                      r={size + 2.5}
                      fill="none"
                      stroke={isHQ ? '#10b981' : '#84cc16'}
                      strokeWidth="0.6"
                      opacity="0.5"
                    />
                  </>
                )}
                
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={size + 0.8}
                  fill="white"
                  opacity="0.9"
                  filter="url(#shadow)"
                />
                
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={size}
                  fill={isHQ ? '#10b981' : '#84cc16'}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    transform: isHovered || isSelected ? 'scale(1.15)' : 'scale(1)',
                    transformOrigin: `${branch.x}px ${branch.y}px`,
                    filter: 'url(#shadow)'
                  }}
                  onMouseEnter={() => setHoveredBranch(branch)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  onClick={() => setSelectedBranch(selectedBranch?.id === branch.id ? null : branch)}
                />
                
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={size * 0.4}
                  fill="white"
                  opacity="0.95"
                  className="pointer-events-none"
                />

                {isHQ && (
                  <>
                    <circle
                      cx={branch.x}
                      cy={branch.y}
                      r={size + 1.2}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.8"
                      opacity="0.9"
                    />
                    <circle
                      cx={branch.x - 1}
                      cy={branch.y - 1}
                      r={1.2}
                      fill="#fbbf24"
                      opacity="0.95"
                    />
                    <path
                      d={`M ${branch.x - 1} ${branch.y - 1.8} L ${branch.x - 0.3} ${branch.y - 0.5} L ${branch.x - 1.7} ${branch.y - 0.5} Z`}
                      fill="white"
                      opacity="0.95"
                    />
                  </>
                )}

                <text
                  x={branch.x}
                  y={branch.y - size - 2.5}
                  textAnchor="middle"
                  fontSize="3.2"
                  fill="#1e293b"
                  fontWeight="700"
                  className="pointer-events-none"
                  filter="url(#shadow)"
                >
                  {branch.shortName.includes('-') ? branch.shortName.split('-')[1] : branch.shortName}
                </text>

                <text
                  x={branch.x}
                  y={branch.y + size + 3.5}
                  textAnchor="middle"
                  fontSize="2.2"
                  fill="#059669"
                  fontWeight="500"
                  className="pointer-events-none"
                  opacity="0.8"
                >
                  {branch.district.replace(' район', '')}
                </text>
              </g>
            );
          })}

          <g opacity="0.6">
            <circle cx="43" cy="50" r="0.8" fill="#3b82f6" />
            <text x="45" y="51" fontSize="2.5" fill="#3b82f6" fontWeight="500">р. Медведица</text>
          </g>

          <g opacity="0.6">
            <circle cx="65" cy="60" r="0.8" fill="#3b82f6" />
            <text x="67" y="61" fontSize="2.5" fill="#3b82f6" fontWeight="500">р. Волга</text>
          </g>
        </svg>

        {hoveredBranch && (
          <div
            className="absolute bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl p-5 pointer-events-none animate-fade-in border-2 border-primary/40"
            style={{
              left: `${hoveredBranch.x}%`,
              top: `${hoveredBranch.y}%`,
              transform: 'translate(-50%, calc(-100% - 20px))',
              minWidth: '300px',
              maxWidth: '350px',
              zIndex: 50
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-3 h-3 rounded-full ${hoveredBranch.id === 1 ? 'bg-agro-green' : 'bg-agro-lime'} mt-1.5 shrink-0`} />
              <div className="flex-1">
                <div className="font-bold text-lg mb-1 text-foreground leading-tight">{hoveredBranch.shortName}</div>
                <div className="text-xs text-muted-foreground mb-2">{hoveredBranch.district}</div>
              </div>
            </div>
            <div className="pl-6 space-y-2">
              <div className="text-sm text-muted-foreground">{hoveredBranch.managerTitle}</div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Icon name="User" size={14} />
                <span className="leading-tight">{hoveredBranch.manager}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedBranch && (
        <Card className="animate-scale-in shadow-2xl border-2 border-primary/40 bg-gradient-to-br from-white via-green-50/20 to-emerald-50/30">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-4 h-4 rounded-full ${selectedBranch.id === 1 ? 'bg-agro-green' : 'bg-agro-lime'}`} />
                  <h3 className="text-3xl font-bold text-foreground">{selectedBranch.name}</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-primary text-white">
                    {selectedBranch.id === 1 ? 'Головное предприятие' : 'Обособленное подразделение'}
                  </Badge>
                  <Badge variant="outline" className="border-agro-lime text-agro-lime">
                    {selectedBranch.district}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => setSelectedBranch(null)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-xl ml-4"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="User" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1 font-medium">{selectedBranch.managerTitle}</div>
                  <div className="font-semibold text-xl text-foreground">{selectedBranch.manager}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-muted">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1 font-medium">Адрес</div>
                  <div className="font-medium text-foreground leading-relaxed">{selectedBranch.address}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-muted">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-muted-foreground mb-1 font-medium">Email</div>
                    <a 
                      href={`mailto:${selectedBranch.email}`}
                      className="font-medium text-primary hover:underline break-all text-sm"
                    >
                      {selectedBranch.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/40 border border-muted">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1 font-medium">Телефон</div>
                    <a 
                      href={`tel:${selectedBranch.phone.replace(/[^\d+]/g, '')}`}
                      className="font-medium text-primary hover:underline text-sm"
                    >
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 h-12 text-base font-semibold shadow-lg"
                  onClick={() => window.location.href = `mailto:${selectedBranch.email}`}
                >
                  <Icon name="Mail" size={20} className="mr-2" />
                  Написать письмо
                </Button>
                {selectedBranch.phone !== '—' && (
                  <Button 
                    variant="outline"
                    className="flex-1 h-12 text-base font-semibold border-2 hover:bg-primary/5"
                    onClick={() => window.location.href = `tel:${selectedBranch.phone.replace(/[^\d+]/g, '')}`}
                  >
                    <Icon name="Phone" size={20} className="mr-2" />
                    Позвонить
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-agro-green/15 to-agro-green/5 border-2 border-agro-green/30 hover:border-agro-green/50 transition-all hover:shadow-lg">
          <CardContent className="p-7 text-center">
            <div className="text-5xl font-bold text-agro-green mb-2">6</div>
            <div className="text-muted-foreground font-semibold">Подразделений</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-agro-lime/15 to-agro-lime/5 border-2 border-agro-lime/30 hover:border-agro-lime/50 transition-all hover:shadow-lg">
          <CardContent className="p-7 text-center">
            <div className="text-5xl font-bold text-agro-lime mb-2">3</div>
            <div className="text-muted-foreground font-semibold">Района области</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-agro-yellow/15 to-agro-yellow/5 border-2 border-agro-yellow/30 hover:border-agro-yellow/50 transition-all hover:shadow-lg">
          <CardContent className="p-7 text-center">
            <div className="text-5xl font-bold text-agro-yellow mb-2">25+</div>
            <div className="text-muted-foreground font-semibold">Лет на рынке</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
